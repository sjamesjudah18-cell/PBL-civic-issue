/* =========================================
   GOVCONNECT MAIN JS
========================================= */


/* =========================================
   TRACK REPORT
========================================= */

function trackReport() {

    const input =
        document.getElementById("trackingInput");

    const result =
        document.getElementById("trackingResult");


    const reportId =
        input.value.trim();


    if (!reportId) {

        result.innerHTML =
            "<p>Please enter a report ID.</p>";

        return;
    }


    /*
        For now we check localStorage.

        Later this will call:

        Django API
            ↓
        Database
            ↓
        Report status
    */


    const reports =
        JSON.parse(
            localStorage.getItem("govconnect_reports")
        ) || [];


    const report =
        reports.find(
            item => item.id === reportId
        );


    if (!report) {

        result.innerHTML = `
            <p>
                Report not found.
                Please check your Report ID.
            </p>
        `;

        return;
    }


    result.innerHTML = `

        <div style="
            background:#f5f7fa;
            padding:25px;
            border-radius:15px;
            margin-top:20px;
        ">

            <strong>
                Report Found
            </strong>

            <p style="margin-top:10px;">
                Issue:
                ${report.issueType}
            </p>

            <p>
                Status:
                <strong>${report.status}</strong>
            </p>

            <p>
                Submitted:
                ${new Date(report.timestamp).toLocaleString()}
            </p>

        </div>

    `;

}