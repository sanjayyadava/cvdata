import re
from typing import List, Set, Tuple
from app.models.cv import (
    CVDocument,
    ATSAnalysisResponse,
    ATSScoreBreakdown
)

ACTION_VERBS = {
    "accelerated", "accomplished", "achieved", "acquired", "adapted", "administered",
    "advanced", "advised", "allocated", "analyzed", "architected", "automated",
    "boosted", "budgeted", "built", "centralized", "championed", "collaborated",
    "constructed", "coordinated", "created", "customized", "debugged", "decreased",
    "delivered", "deployed", "designed", "developed", "devised", "directed",
    "doubled", "drafted", "drove", "eliminated", "enabled", "engineered",
    "enhanced", "established", "executed", "expanded", "expedited", "facilitated",
    "formulated", "founded", "generated", "guided", "halted", "headed",
    "implemented", "improved", "increased", "initiated", "innovated", "installed",
    "instituted", "integrated", "introduced", "invented", "launched", "led",
    "leveraged", "managed", "maximized", "mentored", "migrated", "minimized",
    "modernized", "monitored", "negotiated", "optimized", "orchestrated", "organized",
    "overhauled", "oversaw", "pioneered", "planned", "produced", "programmed",
    "reduced", "refactored", "reinforced", "remodeled", "reorganized", "resolved",
    "restructured", "revamped", "scaled", "scheduled", "shaped", "simplified",
    "slashed", "spearheaded", "standardized", "streamlined", "strengthened", "supervised",
    "surpassed", "trained", "transformed", "unified", "upgraded", "utilized", "yielded"
}

STOP_WORDS = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
    "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
    "below", "between", "both", "but", "by", "can", "cannot", "could", "did", "do",
    "does", "doing", "down", "during", "each", "few", "for", "from", "further",
    "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him",
    "himself", "his", "how", "i", "if", "in", "into", "is", "it", "its", "itself",
    "me", "more", "most", "my", "myself", "no", "nor", "not", "of", "off", "on",
    "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out",
    "over", "own", "same", "she", "should", "so", "some", "such", "than", "that",
    "the", "their", "theirs", "them", "themselves", "then", "there", "these",
    "they", "this", "those", "through", "to", "too", "under", "until", "up",
    "very", "was", "we", "were", "what", "when", "where", "which", "while",
    "who", "whom", "why", "with", "would", "you", "your", "yours", "yourself",
    "yourselves", "will", "shall", "with", "within", "without", "years", "experience",
    "work", "job", "candidate", "role", "requirements", "responsibilities", "ability",
    "strong", "proven", "team", "company", "looking"
}

def extract_all_text(cv: CVDocument) -> str:
    parts = [
        cv.personal.fullName,
        cv.personal.jobTitle,
        cv.personal.summary,
        cv.personal.location
    ]
    for exp in cv.experiences:
        parts.extend([exp.role, exp.company, exp.description])
    for edu in cv.education:
        parts.extend([edu.degree, edu.institution, edu.description])
    for skill in cv.skills:
        parts.append(skill.name)
    for proj in cv.projects:
        parts.extend([proj.title, proj.description, proj.technologies])
    for cert in cv.certifications:
        parts.extend([cert.name, cert.issuer])
    for custom in cv.customSections:
        for citem in custom.items:
            parts.extend([citem.title, citem.subtitle, citem.description])
    return " ".join(filter(None, parts)).lower()

def count_action_verbs(text: str) -> Tuple[int, Set[str]]:
    words = set(re.findall(r'\b[a-z]{3,}\b', text))
    found = words.intersection(ACTION_VERBS)
    return len(found), found

def count_metrics(text: str) -> int:
    # Look for percentages, numbers followed by k/m/+, or currency
    patterns = [
        r'\b\d+(\.\d+)?%',
        r'\$\s?\d+',
        r'\b\d+\s?(k|m|million|billion|users|clients|events|engineers|x)\b',
        r'\b\d+\s?(ms|seconds|minutes|hours|days|weeks|months|years)\b',
        r'\b(reduced|increased|boosted|slashed|grew)\s+by\s+\d+'
    ]
    matches = []
    for p in patterns:
        matches.extend(re.findall(p, text, re.IGNORECASE))
    return len(matches)

def extract_job_keywords(job_desc: str) -> List[str]:
    if not job_desc or not job_desc.strip():
        return []
    words = re.findall(r'\b[a-zA-Z0-9+#.-]{2,}\b', job_desc.lower())
    freq = {}
    for w in words:
        if w not in STOP_WORDS and len(w) > 2 and not w.isdigit():
            freq[w] = freq.get(w, 0) + 1
    # sort by frequency
    sorted_keywords = sorted(freq.items(), key=lambda x: x[1], reverse=True)
    return [k for k, _ in sorted_keywords[:30]]

def analyze_cv_ats(cv: CVDocument, job_description: str = "") -> ATSAnalysisResponse:
    strengths = []
    improvements = []
    
    # 1. Contact Info check (Max 20 pts)
    contact_score = 0
    if cv.personal.fullName and len(cv.personal.fullName.strip()) > 2:
        contact_score += 5
    if cv.personal.email and "@" in cv.personal.email and "." in cv.personal.email:
        contact_score += 5
    if cv.personal.phone and len(cv.personal.phone.strip()) >= 7:
        contact_score += 4
    if cv.personal.location:
        contact_score += 3
    if cv.personal.linkedin or cv.personal.github or cv.personal.website:
        contact_score += 3
        strengths.append("Professional profile links (LinkedIn/GitHub/Portfolio) included.")
    else:
        improvements.append("Add a LinkedIn or GitHub profile link to provide recruiters with proof of work.")

    if contact_score >= 17:
        strengths.append("Contact details are thorough, professional, and easy for ATS scanners to parse.")
    else:
        improvements.append("Complete your contact information (email, phone, location) for recruiter reachability.")

    # 2. Summary Quality check (Max 20 pts)
    summary_score = 0
    summary = cv.personal.summary.strip() if cv.personal.summary else ""
    summary_words = len(summary.split()) if summary else 0
    if summary_words >= 30 and summary_words <= 120:
        summary_score = 20
        strengths.append(f"Professional summary is well-balanced ({summary_words} words), highlighting value quickly.")
    elif summary_words > 120:
        summary_score = 14
        improvements.append("Your summary is a bit lengthy. Aim for 40-90 punchy words for quick ATS skimming.")
    elif summary_words > 10:
        summary_score = 12
        improvements.append("Expand your summary to 3-4 impactful sentences describing your specialization and achievements.")
    else:
        summary_score = 0
        improvements.append("Add a professional summary section summarizing your career achievements and core value.")

    # 3. Experience Impact & Metrics (Max 25 pts)
    all_text = extract_all_text(cv)
    verb_count, found_verbs = count_action_verbs(all_text)
    metric_count = count_metrics(all_text)

    exp_score = 0
    if len(cv.experiences) > 0:
        exp_score += 8
        if len(cv.experiences) >= 2:
            exp_score += 4

        # Action verbs
        if verb_count >= 8:
            exp_score += 7
            strengths.append(f"Strong action-driven vocabulary detected ({verb_count} distinct high-impact verbs).")
        elif verb_count >= 4:
            exp_score += 4
            improvements.append("Incorporate more decisive action verbs (e.g. 'architected', 'accelerated', 'orchestrated').")
        else:
            exp_score += 2
            improvements.append("Use power verbs at the start of each bullet point rather than passive descriptions.")

        # Metrics / Quantifiable results
        if metric_count >= 4:
            exp_score += 6
            strengths.append(f"Great use of quantifiable results ({metric_count}+ measurable outcomes like %, $, or scales).")
        elif metric_count >= 1:
            exp_score += 3
            improvements.append("Quantify your achievements with concrete metrics (e.g. 'increased speed by 35%', 'reduced costs by $15k').")
        else:
            improvements.append("No quantifiable metrics found in experience. Add percentages, numbers, or scale to validate impact.")
    else:
        improvements.append("Add at least one detailed work experience entry with clear accomplishments.")

    # 4. Skills & Competencies (Max 20 pts)
    skill_score = 0
    skill_count = len(cv.skills)
    if skill_count >= 8:
        skill_score = 20
        strengths.append(f"Robust skill inventory ({skill_count} skills listed) covering multiple competencies.")
    elif skill_count >= 4:
        skill_score = 14
        improvements.append("List 8-12 core skills specifically aligned with your target career track.")
    elif skill_count > 0:
        skill_score = 8
        improvements.append("Add more domain and technical skills to match ATS filters.")
    else:
        improvements.append("Include a dedicated Skills section with current industry tools and technologies.")

    # 5. Education & Formatting Completeness (Max 15 pts)
    format_score = 0
    if cv.education and len(cv.education) > 0:
        format_score += 8
    else:
        improvements.append("Add your formal education or equivalent relevant certifications.")

    if cv.projects and len(cv.projects) > 0:
        format_score += 4
        strengths.append("Portfolio projects included, validating hands-on engineering capabilities.")

    if cv.certifications and len(cv.certifications) > 0:
        format_score += 3
        strengths.append("Industry certifications listed, demonstrating verified credentials.")

    # Keyword Matching if Job Description provided
    matched_keywords = []
    missing_keywords = []
    if job_description and job_description.strip():
        target_keywords = extract_job_keywords(job_description)
        cv_words = set(re.findall(r'\b[a-zA-Z0-9+#.-]{2,}\b', all_text))
        
        for kw in target_keywords:
            if kw in cv_words:
                matched_keywords.append(kw)
            else:
                missing_keywords.append(kw)

        # Bonus / adjustment based on JD match
        if target_keywords:
            match_ratio = len(matched_keywords) / len(target_keywords)
            if match_ratio >= 0.7:
                strengths.append(f"Outstanding keyword match: {len(matched_keywords)} of top job keywords found in your CV.")
            elif match_ratio < 0.4:
                improvements.append(f"Consider embedding target keywords: {', '.join(missing_keywords[:6])}.")

    overall_score = min(100, contact_score + summary_score + exp_score + skill_score + format_score)

    # Generate overarching summary
    if overall_score >= 85:
        summary_verdict = "Excellent! Your resume exhibits high ATS compatibility with strong action verbs, quantifiable achievements, and clear structure."
    elif overall_score >= 70:
        summary_verdict = "Good foundation. Addressing missing metrics and targeted keywords will significantly elevate your ATS ranking."
    else:
        summary_verdict = "Needs improvement. Focus on quantifying experience bullets, adding a punchy summary, and ensuring all standard sections are complete."

    return ATSAnalysisResponse(
        overallScore=overall_score,
        breakdown=ATSScoreBreakdown(
            contactInfo=min(20, contact_score),
            summaryQuality=min(20, summary_score),
            experienceImpact=min(25, exp_score),
            skillsRelevance=min(20, skill_score),
            formattingCompleteness=min(15, format_score)
        ),
        strengths=strengths,
        improvements=improvements,
        matchedKeywords=matched_keywords[:15],
        missingKeywords=missing_keywords[:15],
        actionVerbCount=verb_count,
        quantifiableMetricCount=metric_count,
        summary=summary_verdict
    )
