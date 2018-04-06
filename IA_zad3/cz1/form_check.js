function isEmpty(str) {
    if (str.length) {
        return false;
    } else return true;
}

function hasWhiteSpace(str) {
    return /\s/.test(str);
}

function hasNumber(str) {
    return /\d/.test(str);
}

function checkEmail(obj, msg) {
    var str = obj.value;
    var errorFieldName = "e_" + obj.name.substr(2, obj.name.length);
    if (hasWhiteSpace(str)) {
        //alert("Podaj właściwy e-mail");
        document.getElementById(errorFieldName).innerHTML = msg;
        obj.focus();
        return false;
    } else {
        var at = str.indexOf("@");
        if (at < 1) {
            //alert("Nieprawidłowy e-mail");
            document.getElementById(errorFieldName).innerHTML = msg;
            obj.focus();
            return false;
        } else {
            var l = -1;
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (c == ".") {
                    l = i;
                }
            }
            if ((l < (at + 2)) || (l == str.length - 1)) {
                //alert("Nieprawidłowy e-mail");
                document.getElementById(errorFieldName).innerHTML = msg;
                obj.focus();
                return false;
            }
        }
        return true;
    }
}

function checkStringAndFocus(obj, msg) {
    var str = obj.value;
    var errorFieldName = "e_" + obj.name.substr(2, obj.name.length);
    if (hasWhiteSpace(str) || isEmpty(str)) {
        document.getElementById(errorFieldName).innerHTML = msg;
        obj.focus();
        startTimer(errorFieldName);
        return false;
    } else {
        return true;
    }
}

function validate(document) {
    if (!checkStringAndFocus(document.elements.f_imie, "Podaj prawidłowe imię.") ||
        !checkStringAndFocus(document.elements.f_nazwisko, "Podaj prawidłowe nazwisko.") ||
        !checkStringAndFocus(document.elements.f_ulica, "Podaj prawidłową nazwę ulicy.") ||
        !checkStringAndFocus(document.elements.f_miasto, "Podaj prawidłową nazwę miasta.") ||
        !checkEmailRegEx(document.elements.f_email, "Podaj prawidłowy adres email") ||
        !checkZIPCodeRegEx(document.elements.f_kod, "Podaj prawidłowy kod.")) {
        for (var i in document.elements) {
            document.elements[i].className = "wrong";
        }
        return false;
    } else return true;
}

function checkString(strToTest, message) {
    if (isEmpty(strToTest) || hasWhiteSpace(strToTest)) {
        alert(message);
        return false;
    } else return true;
}

var errorField = "";

function startTimer(fName) {
    errorField = fName;
    window.setTimeout("clearError(errorField)", 5000);
}

function clearError(objName) {
    document.getElementById(objName).innerHTML = "";
}

function showElement(e) {
    document.getElementById(e).style.visibility = 'visible';
}

function hideElement(e) {
    document.getElementById(e).style.visibility = 'hidden';
}

function checkEmailRegEx(obj, msg) {
    var str = obj.value;
    var errorFieldName = "e_" + obj.name.substr(2, obj.name.length);
    var email = /[a-zA-Z_0-9\.]+@[a-zA-Z_0-9\.]+\.[a-zA-Z][a-zA-Z]+/;
    if (email.test(str))
        return true;
    else {
        document.getElementById(errorFieldName).innerHTML = msg;
        obj.focus();
        return false;
    }
}

function checkZIPCodeRegEx(obj) {
    var zipCode = /^[0-9]{2}-[0-9]{3}$/;
    var str = obj.value;
    var element = document.getElementById("kod");
    var errorFieldName = "e_" + obj.name.substr(2, obj.name.length);

    if (zipCode.test(str)) {
        element.innerHTML = "OK";
        element.className = "green";
        return true;
    } else {
        element.innerHTML = "Źle";
        element.className = "red";
        obj.focus();
        return false;
    }
}

alterRows(1, document.getElementsByTagName("tr")[0]);

function alterRows(i, e) {
    if (e) {
        if (i % 2 == 1) {
            e.setAttribute("style", "background-color: Aqua;");
        }
        e = e.nextSibling;
        while (e && e.nodeType != 1) {
            e = e.nextSibling;
        }
        alterRows(++i, e);
    }
}

function nextNode(e) {
    while (e && e.nodeType != 1) {
        e = e.nextSibling;
    }
    return e;
}

function prevNode(e) {
    while (e && e.nodeType != 1) {
        e = e.previousSibling;
    }
    return e;
}

function swapRows(b) {
    var tab = prevNode(b.previousSibling);
    var tBody = nextNode(tab.firstChild);
    var lastNode = prevNode(tBody.lastChild);
    tBody.removeChild(lastNode);
    var firstNode = nextNode(tBody.firstChild);
    tBody.insertBefore(lastNode, firstNode);
}

function cnt(form, msg, maxSize) {
    if (form.value.length > maxSize)
        form.value = form.value.substring(0, maxSize);
    else
        msg.innerHTML = maxSize - form.value.length;
}