/* =========================================
   GOVCONNECT REPORT PAGE
========================================= */


/* =========================================
   IMAGE PREVIEW
========================================= */

const imageInput = document.getElementById("issueImage");

const imagePreview = document.getElementById("imagePreview");


if (imageInput) {

    imageInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {

            imagePreview.src = event.target.result;

            imagePreview.style.display = "block";

        };

        reader.readAsDataURL(file);

    });

}


/* =========================================
   GET USER LOCATION
========================================= */

function getLocation() {

    const locationStatus =
        document.getElementById("locationStatus");

    if (!navigator.geolocation) {

        locationStatus.innerText =
            "Geolocation is not supported by this browser.";

        return;
    }


    locationStatus.innerText =
        "Getting your location...";


    navigator.geolocation.getCurrentPosition(

        function (position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            document.getElementById("latitude").value =
                latitude;

            document.getElementById("longitude").value =
                longitude;


            locationStatus.innerText =
                `Location captured: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

        },

        function (error) {

            console.error(error);

            locationStatus.innerText =
                "Unable to get location. Please allow location access.";

        },

        {
            enableHighAccuracy: true,

            timeout: 10000,

            maximumAge: 0
        }

    );

}


/* =========================================
   FORM SUBMISSION
========================================= */

const reportForm =
    document.getElementById("reportForm");


if (reportForm) {

    reportForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* Get form data */

            const image =
                document.getElementById("issueImage").files[0];

            const issueType =
                document.getElementById("issueType").value;

            const description =
                document.getElementById("description").value;

            const latitude =
                document.getElementById("latitude").value;

            const longitude =
                document.getElementById("longitude").value;


            /* Basic validation */

            if (!image) {

                alert(
                    "Please upload a photo of the issue."
                );

                return;
            }


            if (!issueType) {

                alert(
                    "Please select an issue type."
                );

                return;
            }


            if (!description.trim()) {

                alert(
                    "Please describe the problem."
                );

                return;
            }


            if (!latitude || !longitude) {

                alert(
                    "Please capture your location before submitting."
                );

                return;
            }


            /* Create report object */

            const report = {

                id: generateReportId(),

                issueType: issueType,

                description: description,

                latitude: latitude,

                longitude: longitude,

                timestamp:
                    new Date().toISOString(),

                status: "Reported",

                imageName: image.name

            };


            /* Save locally for now */

            saveReportLocally(report);


            /* Show success */

            document.getElementById("successMessage")
                .style.display = "block";


            document.getElementById("reportId")
                .innerText =
                `Report ID: ${report.id}`;


            /* Disable form */

            document.querySelector(".submit-btn")
                .disabled = true;


            document.querySelector(".submit-btn")
                .innerText =
                "Report Submitted";

        }
    );

}


/* =========================================
   GENERATE REPORT ID
========================================= */

function generateReportId() {

    const randomNumber =
        Math.floor(
            100000 + Math.random() * 900000
        );

    return `GC-${randomNumber}`;

}


/* =========================================
   SAVE REPORT
========================================= */

function saveReportLocally(report) {

    let reports =
        JSON.parse(
            localStorage.getItem("govconnect_reports")
        ) || [];


    reports.push(report);


    localStorage.setItem(
        "govconnect_reports",
        JSON.stringify(reports)
    );

}