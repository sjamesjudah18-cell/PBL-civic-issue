/* =========================================
   GOVCONNECT API
========================================= */


/*
    IMPORTANT:

    This file will eventually communicate
    with your Django REST Framework backend.

    For now the backend doesn't exist,
    so we're keeping the API functions ready.
*/


const API_BASE_URL =
    "http://127.0.0.1:8000/api";


/* =========================================
   SUBMIT REPORT
========================================= */

async function submitReportToBackend(reportData) {

    try {

        const response =
            await fetch(
                `${API_BASE_URL}/reports/`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(reportData)
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to submit report"
            );

        }


        return await response.json();

    }

    catch (error) {

        console.error(
            "API Error:",
            error
        );

        throw error;

    }

}


/* =========================================
   GET REPORT
========================================= */

async function getReport(reportId) {

    try {

        const response =
            await fetch(
                `${API_BASE_URL}/reports/${reportId}/`
            );


        if (!response.ok) {

            throw new Error(
                "Report not found"
            );

        }


        return await response.json();

    }

    catch (error) {

        console.error(
            "API Error:",
            error
        );

        throw error;

    }

}