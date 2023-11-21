package it.uni.na.service;

import it.uni.na.model.Employee;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class LoginService {
    public static Boolean evaluateLoginFormService(String username, String password) {
        if(username == null || password == null) {
            return false;
        }
        return Employee.signIn(username, password);
    }

    //TODO sostituire con costanti
    public static String checkUsernameValidityService(String username) {
        String result;
        if(username == null) {
            result = "nullvalue";
        } else if (username.isBlank()) {
            result = "blankvalue";
        } else if (username.isEmpty()) {
            result = "emptyvalue";
        } else if (!username.matches("\\A\\p{ASCII}*\\z")) {
            result = "notascii";
        } else if(username.length() > 40) {
            result = "toobig";
        } else if(username.length() < 4) {
            result = "toosmall";
        } else result = "correct";
        return result;
    }
    //TODO sostituire con costanti
    public static String checkPasswordValidityService(String password) {
        String result;
        if(password == null) {
            result = "nullvalue";
        } else if (password.isBlank()) {
            result = "blankvalue";
        } else if (password.isEmpty()) {
            result = "emptyvalue";
        } else if (!password.matches("\\A\\p{ASCII}*\\z")) {
            result = "notascii";
        } else if(password.length() < 8) {
            result = "toosmall";
        }
        else if(password.length() >= 8) {
            Pattern letter = Pattern.compile("[a-z]", Pattern.CASE_INSENSITIVE);
            Pattern uppercase = Pattern.compile("[A-Z]");
            Pattern digit = Pattern.compile("[0-9]");
            Pattern special = Pattern.compile ("[!@#$%&*()_+=|<>?{}\\[\\]~-]");


            Matcher hasLetter = letter.matcher(password);
            Matcher hasUppercase = uppercase.matcher(password);
            Matcher hasDigit = digit.matcher(password);
            Matcher hasSpecial = special.matcher(password);

            if(!hasLetter.find()) {
                result = "atleastoneletter";
            } else if (!hasUppercase.find()) {
                result = "atleastoneuppercase";
            } else if (!hasDigit.find()) {
                result = "atleastonedigit";
            } else if (!hasSpecial.find()) {
                result = "atleastonespecial";
            }
            else result = "correct";
        }
        else result = "correct";
        return result;
    }
    public static Boolean checkFirstLoginStatus(String username) {
        if(username == null) {
            return false;
        }
        return Employee.isFirstLogin(username);
    }
}
