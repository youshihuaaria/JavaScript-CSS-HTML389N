// place your javascript code here

/* Setting the function to call when submit is selected */
window.onsubmit=validateForm;

function validateForm() {
    var invalidMessages = "";
    /* confirm information*/
    var confirmMessage = "Do you want to submit the form data?";
    /* validate phone data */
    var phone1 = document.getElementById("phoneFirstPart").value;
    var phone2 = document.getElementById("phoneSecondPart").value;
    var phone3 = document.getElementById("phoneThirdPart").value;

    if (!phoneValidation(phone1, 3) || !phoneValidation(phone2, 3) || !phoneValidation(phone3, 4)) {
        invalidMessages += "Invalid phone number.\n";
    }

    /* validate condition */
    var hbp = document.getElementById("highBloodPressure");
    var diabetes = document.getElementById("diabetes");
    var glaucoma = document.getElementById("glaucoma");
    var asthma = document.getElementById("asthma");
    var none = document.getElementById("none");

    if (!hbp.checked && !diabetes.checked && !glaucoma.checked && !asthma.checked && !none.checked) {
        invalidMessages += "No conditions selected.\n";
    }

    if (none.checked) {
        if (hbp.checked || diabetes.checked || glaucoma.checked || asthma.checked) {
            invalidMessages += "Invalid conditions selection.\n";
        }
    }

    /* validate time period */
    var never = document.getElementById("period1");
    var oneYear = document.getElementById("period2");
    var twoYear = document.getElementById("period3");
    var moreThanTwoYear = document.getElementById("period4");

    if (!never.checked && !oneYear.checked && !twoYear.checked && !moreThanTwoYear.checked) {
        invalidMessages += "No time period selected.\n";
    }

    /* validate study id*/
    var invalid = false;
    var studyIDA = document.getElementById("firstFourDigits").value;
    var studyIDB = document.getElementById("secondFourDigits").value;

    if (studyIDA.charAt(0) != "A" || studyIDB.charAt(0) != "B") {
        invalid = true;
    }

    var A = studyIDA.slice(1, 4);
    var B = studyIDB.slice(1, 4);

    if (String(parseInt(A)) !== A || String(parseInt(B)) !== B) {
        invalid = true;
    }

    if (invalid) invalidMessages+="Invalid study id.\n";

    /* confirm */
    if (invalidMessages !== "") {
        alert(invalidMessages);
        return false;
    }
    if (window.confirm(confirmMessage)) {
        return true;
    } else {
        return false;
    }

}


function phoneValidation(str, length) {
    if (str.length != length) {
        return false;
    }

    if (String(parseInt(str)) !== str) {
        return false;
    }

    return true;
}


