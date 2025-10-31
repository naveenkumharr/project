// Time for which download button stays visible (10 minutes = 600000 ms)
const SHOW_DURATION = 600000;

const downloadBtn = document.getElementById("downloadBtn");

// Function: show button and remember time
function showDownloadButton() {
    downloadBtn.style.display = "inline-block";
    const showTime = new Date().getTime();
    localStorage.setItem("downloadBtnShownAt", showTime);
}

// Function: check button status on every page load
function checkDownloadButtonStatus() {
    const shownAt = localStorage.getItem("downloadBtnShownAt");
    if (shownAt) {
        const currentTime = new Date().getTime();
        const elapsed = currentTime - shownAt;

        if (elapsed < SHOW_DURATION) {
            // Still within 10 minutes → keep showing
            downloadBtn.style.display = "inline-block";
        } else {
            // Time expired → hide and clear
            localStorage.removeItem("downloadBtnShownAt");
            downloadBtn.style.display = "none";
        }
    } else {
        downloadBtn.style.display = "none";
    }
}

// Run on page load
checkDownloadButtonStatus();


// -----------------------------
// Razorpay Payment Integration
// -----------------------------
function buyPhone(phoneName) {
    var options = {
        "key": "rzp_test_Ra5h8Fd502rIwy", // Replace with your Razorpay Key
        "amount": 29900, // ₹299 in paise
        "currency": "INR",
        "name": "Phone Store",
        "description": phoneName,
        "handler": function (response) {
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
            showDownloadButton(); // ✅ call this instead of directly showing button
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}
