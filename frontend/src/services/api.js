const API_URL = "/api";

/*
|--------------------------------------------------------------------------
| Helper
|--------------------------------------------------------------------------
*/

async function handleResponse(response) {
  if (!response.ok) {
    let message = `Request failed: ${response.status}`;

    try {
      const data = await response.json();

      if (data?.detail) {
        message = data.detail;
      }
    } catch {
      // Ignore JSON parsing errors
    }

    throw new Error(message);
  }

  // DELETE or empty response
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

/*
|--------------------------------------------------------------------------
| GET ALL CVS
|--------------------------------------------------------------------------
*/

export async function getCVs() {
  const response = await fetch(`${API_URL}/cvs/`);

  return handleResponse(response);
}

/*
|--------------------------------------------------------------------------
| GET SINGLE CV
|--------------------------------------------------------------------------
*/

export async function getCV(cvId) {
  const response = await fetch(`${API_URL}/cvs/${cvId}`);

  return handleResponse(response);
}

/*
|--------------------------------------------------------------------------
| CREATE CV
|--------------------------------------------------------------------------
*/

export async function createCV(cvData) {
  const response = await fetch(`${API_URL}/cvs/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cvData),
  });

  return handleResponse(response);
}

/*
|--------------------------------------------------------------------------
| UPDATE CV
|--------------------------------------------------------------------------
*/

export async function updateCV(cvId, cvData) {
  const response = await fetch(`${API_URL}/cvs/${cvId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cvData),
  });

  return handleResponse(response);
}

/*
|--------------------------------------------------------------------------
| DELETE CV
|--------------------------------------------------------------------------
*/

export async function deleteCV(cvId) {
  const response = await fetch(`${API_URL}/cvs/${cvId}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}

/*
|--------------------------------------------------------------------------
| DOWNLOAD PDF
|--------------------------------------------------------------------------
|
| IMPORTANT:
| This assumes your FastAPI backend has:
|
| GET /cvs/{cv_id}/pdf
|
| We will verify this in Swagger in the next step.
|--------------------------------------------------------------------------
*/

export async function downloadBackendPDF(cvId) {
  if (!cvId) {
    throw new Error("CV ID is missing");
  }

  const response = await fetch(`${API_URL}/cvs/${cvId}/pdf`);

  if (!response.ok) {
    let message = "Failed to generate PDF";

    try {
      const data = await response.json();

      if (data?.detail) {
        message = data.detail;
      }
    } catch {
      // Ignore JSON parsing errors
    }

    throw new Error(message);
  }

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `cv-${cvId}.pdf`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
}