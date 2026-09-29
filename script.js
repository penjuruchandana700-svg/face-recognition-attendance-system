// ========================================
// FACE RECOGNITION ATTENDANCE SYSTEM
// ========================================


// Get HTML elements
const camera = document.getElementById("camera");

const startCameraBtn =
    document.getElementById("startCameraBtn");

const stopCameraBtn =
    document.getElementById("stopCameraBtn");

const attendanceBtn =
    document.getElementById("attendanceBtn");

const studentName =
    document.getElementById("studentName");

const studentId =
    document.getElementById("studentId");

const dateElement =
    document.getElementById("date");

const timeElement =
    document.getElementById("time");

const statusElement =
    document.getElementById("status");

const attendanceTable =
    document.getElementById("attendanceTable");


// Camera stream
let cameraStream = null;


// ========================================
// DATE AND TIME
// ========================================

function updateDateTime() {

    const now = new Date();

    dateElement.textContent =
        now.toLocaleDateString();

    timeElement.textContent =
        now.toLocaleTimeString();
}

updateDateTime();

setInterval(updateDateTime, 1000);


// ========================================
// START CAMERA
// ========================================

async function startCamera() {

    try {

        cameraStream =
            await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            });

        camera.srcObject = cameraStream;

        statusElement.textContent =
            "Camera Active";

        statusElement.className =
            "status present";

    }

    catch (error) {

        console.error(error);

        statusElement.textContent =
            "Camera Error";

        statusElement.className =
            "status error";

        alert(
            "Unable to access camera.\n\n" +
            "Please allow camera permission."
        );
    }
}


// ========================================
// STOP CAMERA
// ========================================

function stopCamera() {

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(track => track.stop());

        cameraStream = null;
    }

    camera.srcObject = null;

    statusElement.textContent =
        "Camera Stopped";

    statusElement.className =
        "status waiting";
}


// ========================================
// MARK ATTENDANCE
// ========================================

function markAttendance() {

    /*
        DEMO DATA

        In a real project, these values
        will come from the face recognition
        system/backend.
    */

    const name = "John Doe";
    const id = "ST001";

    const now = new Date();

    const date =
        now.toLocaleDateString();

    const time =
        now.toLocaleTimeString();


    // Update student details
    studentName.textContent = name;

    studentId.textContent = id;

    dateElement.textContent = date;

    timeElement.textContent = time;


    // Check duplicate attendance
    const rows =
        attendanceTable.querySelectorAll("tr");

    let alreadyMarked = false;


    rows.forEach(row => {

        const cells =
            row.querySelectorAll("td");

        if (cells.length >= 3) {

            const existingId =
                cells[0].textContent;

            const existingDate =
                cells[2].textContent;

            if (
                existingId === id &&
                existingDate === date
            ) {

                alreadyMarked = true;
            }
        }
    });


    if (alreadyMarked) {

        alert(
            "Attendance has already been marked for " +
            name +
            " today."
        );

        return;
    }


    // Create table row
    const row =
        document.createElement("tr");


    row.innerHTML = `
        <td>${id}</td>

        <td>${name}</td>

        <td>${date}</td>

        <td>${time}</td>

        <td>
            <span class="status present">
                Present
            </span>
        </td>
    `;


    // Add row to table
    attendanceTable.appendChild(row);


    // Update status
    statusElement.textContent =
        "Present";

    statusElement.className =
        "status present";


    alert(
        "Attendance marked successfully!"
    );
}


// ========================================
// BUTTON EVENTS
// ========================================

startCameraBtn.addEventListener(
    "click",
    startCamera
);


stopCameraBtn.addEventListener(
    "click",
    stopCamera
);


attendanceBtn.addEventListener(
    "click",
    markAttendance
);


// ========================================
// PAGE LOAD
// ========================================

window.addEventListener(
    "load",
    function () {

        console.log(
            "Face Recognition Attendance System loaded."
        );

    }
);