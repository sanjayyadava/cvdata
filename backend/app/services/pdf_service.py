import io
import html
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable
)
from app.models.cv import CVDocument

def hex_to_color(hex_str: str, default="#2563eb"):
    try:
        if not hex_str.startswith("#"):
            hex_str = "#" + hex_str
        return colors.HexColor(hex_str)
    except Exception:
        return colors.HexColor(default)

def escape_xml(text: str) -> str:
    if not text:
        return ""
    # ReportLab paragraph expects XML-escaped text
    return html.escape(str(text)).replace("\n", "<br/>")

def generate_pdf_buffer(cv: CVDocument) -> io.BytesIO:
    buffer = io.BytesIO()
    
    # 0.5 in margins (36 pt) for optimal page utilization
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    primary_hex = cv.metadata.primaryColor or "#2563eb"
    primary_color = hex_to_color(primary_hex)
    dark_gray = colors.HexColor("#1e293b")
    med_gray = colors.HexColor("#475569")
    light_line = colors.HexColor("#cbd5e1")

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'CVTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=dark_gray,
        spaceAfter=2
    )

    role_subtitle_style = ParagraphStyle(
        'CVRoleSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=primary_color,
        spaceAfter=6
    )

    contact_style = ParagraphStyle(
        'CVContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=med_gray,
        spaceAfter=10
    )

    section_heading_style = ParagraphStyle(
        'CVSectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=primary_color,
        spaceBefore=8,
        spaceAfter=2
    )

    item_title_style = ParagraphStyle(
        'CVItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=dark_gray
    )

    item_date_style = ParagraphStyle(
        'CVItemDate',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        alignment=2, # Right aligned
        textColor=med_gray
    )

    item_subtitle_style = ParagraphStyle(
        'CVItemSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=13,
        textColor=med_gray,
        spaceAfter=3
    )

    body_style = ParagraphStyle(
        'CVBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=dark_gray,
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'CVBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12.5,
        textColor=dark_gray,
        leftIndent=12,
        spaceAfter=2
    )

    skill_badge_style = ParagraphStyle(
        'CVSkill',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=dark_gray
    )

    story = []

    # 1. Header (Name, Title, Contact Info)
    name = cv.personal.fullName or "Your Name"
    story.append(Paragraph(escape_xml(name), title_style))

    if cv.personal.jobTitle:
        story.append(Paragraph(escape_xml(cv.personal.jobTitle), role_subtitle_style))

    contacts = []
    if cv.personal.email:
        contacts.append(escape_xml(cv.personal.email))
    if cv.personal.phone:
        contacts.append(escape_xml(cv.personal.phone))
    if cv.personal.location:
        contacts.append(escape_xml(cv.personal.location))
    if cv.personal.website:
        contacts.append(escape_xml(cv.personal.website))
    if cv.personal.linkedin:
        contacts.append(escape_xml(cv.personal.linkedin))
    if cv.personal.github:
        contacts.append(escape_xml(cv.personal.github))

    if contacts:
        contact_line = " &nbsp;|&nbsp; ".join(contacts)
        story.append(Paragraph(contact_line, contact_style))

    story.append(HRFlowable(width="100%", thickness=1.5, color=primary_color, spaceAfter=8, spaceBefore=0))

    # Helper for Section Title
    def add_section_header(title: str):
        story.append(Paragraph(escape_xml(title.upper()), section_heading_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=light_line, spaceAfter=6, spaceBefore=2))

    # 2. Summary
    if cv.personal.summary and cv.personal.summary.strip():
        add_section_header("Professional Summary")
        story.append(Paragraph(escape_xml(cv.personal.summary), body_style))
        story.append(Spacer(1, 4))

    # 3. Work Experience
    if cv.experiences:
        add_section_header("Work Experience")
        for exp in cv.experiences:
            # Header table with Role/Company on left, Date/Location on right
            left_p = Paragraph(f"<b>{escape_xml(exp.role)}</b> — {escape_xml(exp.company)}", item_title_style)
            
            date_range = exp.startDate
            if exp.current:
                date_range += " – Present"
            elif exp.endDate:
                date_range += f" – {exp.endDate}"
            
            loc_date_text = date_range
            if exp.location:
                loc_date_text = f"{exp.location} | {date_range}"
            right_p = Paragraph(escape_xml(loc_date_text), item_date_style)

            header_table = Table([[left_p, right_p]], colWidths=[380, 160])
            header_table.setStyle(TableStyle([
                ('VALIGN', (0,0), (-1,-1), 'TOP'),
                ('LEFTPADDING', (0,0), (-1,-1), 0),
                ('RIGHTPADDING', (0,0), (-1,-1), 0),
                ('TOPPADDING', (0,0), (-1,-1), 1),
                ('BOTTOMPADDING', (0,0), (-1,-1), 2),
            ]))
            story.append(header_table)

            if exp.description:
                for line in exp.description.split("\n"):
                    clean_line = line.strip()
                    if clean_line:
                        if clean_line.startswith("•") or clean_line.startswith("-"):
                            bullet_text = clean_line.lstrip("•- ").strip()
                            story.append(Paragraph(f"&bull; {escape_xml(bullet_text)}", bullet_style))
                        else:
                            story.append(Paragraph(escape_xml(clean_line), body_style))
            story.append(Spacer(1, 5))

    # 4. Education
    if cv.education:
        add_section_header("Education")
        for edu in cv.education:
            left_p = Paragraph(f"<b>{escape_xml(edu.degree)}</b>", item_title_style)
            
            date_range = edu.startDate
            if edu.current:
                date_range += " – Present"
            elif edu.endDate:
                date_range += f" – {edu.endDate}"
            
            right_p = Paragraph(escape_xml(date_range), item_date_style)
            
            header_table = Table([[left_p, right_p]], colWidths=[400, 140])
            header_table.setStyle(TableStyle([
                ('VALIGN', (0,0), (-1,-1), 'TOP'),
                ('LEFTPADDING', (0,0), (-1,-1), 0),
                ('RIGHTPADDING', (0,0), (-1,-1), 0),
                ('TOPPADDING', (0,0), (-1,-1), 1),
                ('BOTTOMPADDING', (0,0), (-1,-1), 1),
            ]))
            story.append(header_table)
            
            inst_text = edu.institution
            if edu.location:
                inst_text += f", {edu.location}"
            if edu.gpa:
                inst_text += f" &nbsp;(GPA: {edu.gpa})"
            story.append(Paragraph(escape_xml(inst_text), item_subtitle_style))

            if edu.description:
                story.append(Paragraph(escape_xml(edu.description), body_style))
            story.append(Spacer(1, 4))

    # 5. Skills
    if cv.skills:
        add_section_header("Skills & Competencies")
        
        # Group skills by category if available
        categorized = {}
        for s in cv.skills:
            cat = s.category or "Technical Skills"
            if cat not in categorized:
                categorized[cat] = []
            skill_text = s.name
            if s.level:
                skill_text += f" ({s.level})"
            categorized[cat].append(skill_text)
        
        for cat, items in categorized.items():
            cat_label = f"<b>{escape_xml(cat)}:</b> "
            items_str = ", ".join(items)
            story.append(Paragraph(cat_label + escape_xml(items_str), body_style))
        story.append(Spacer(1, 4))

    # 6. Projects
    if cv.projects:
        add_section_header("Projects")
        for proj in cv.projects:
            title_line = f"<b>{escape_xml(proj.title)}</b>"
            links = []
            if proj.link:
                links.append(f"<a href='{proj.link}' color='{primary_hex}'>Live Demo</a>")
            if proj.github:
                links.append(f"<a href='{proj.github}' color='{primary_hex}'>GitHub</a>")
            if links:
                title_line += " [" + " | ".join(links) + "]"
            
            story.append(Paragraph(title_line, item_title_style))
            if proj.technologies:
                tech_line = f"<i>Tech Stack: {escape_xml(proj.technologies)}</i>"
                story.append(Paragraph(tech_line, item_subtitle_style))
            if proj.description:
                story.append(Paragraph(escape_xml(proj.description), body_style))
            story.append(Spacer(1, 4))

    # 7. Certifications
    if cv.certifications:
        add_section_header("Certifications & Credentials")
        for cert in cv.certifications:
            cert_line = f"<b>{escape_xml(cert.name)}</b> — {escape_xml(cert.issuer)}"
            if cert.issueDate:
                cert_line += f" ({escape_xml(cert.issueDate)})"
            story.append(Paragraph(cert_line, body_style))
        story.append(Spacer(1, 4))

    # 8. Custom Sections
    if cv.customSections:
        for csec in cv.customSections:
            if csec.items:
                add_section_header(csec.title or "Additional Information")
                for citem in csec.items:
                    left_p = Paragraph(f"<b>{escape_xml(citem.title)}</b>", item_title_style)
                    right_p = Paragraph(escape_xml(citem.date or ""), item_date_style)
                    header_table = Table([[left_p, right_p]], colWidths=[420, 120])
                    header_table.setStyle(TableStyle([
                        ('VALIGN', (0,0), (-1,-1), 'TOP'),
                        ('LEFTPADDING', (0,0), (-1,-1), 0),
                        ('RIGHTPADDING', (0,0), (-1,-1), 0),
                        ('TOPPADDING', (0,0), (-1,-1), 1),
                        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
                    ]))
                    story.append(header_table)
                    if citem.subtitle:
                        story.append(Paragraph(escape_xml(citem.subtitle), item_subtitle_style))
                    if citem.description:
                        story.append(Paragraph(escape_xml(citem.description), body_style))
                    story.append(Spacer(1, 3))

    doc.build(story)
    buffer.seek(0)
    return buffer
