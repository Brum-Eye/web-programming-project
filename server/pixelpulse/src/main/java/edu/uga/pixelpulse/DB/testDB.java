package edu.uga.pixelpulse.DB;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.util.ArrayList;
import java.util.List;

public class testDB {
    final static String URL = "web-programming-do-user-18162356-0.j.db.ondigitalocean.com:25060/defaultdb";
    final static String USERNAME = "doadmin";
    final static String PASSWORD = "AVNS_Z470_Iz8zwd0h-Wfn1A";
    Connection connection = null;

    /**
     * Calling this will init the connection to db
     */
    public testDB() {
        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
        } catch (Exception e) {
            // TODO: handle exception
        }
    }

    /**
     * This method will add the user info example
     * 
     * @param userID     userID
     * @param cardNumber card number
     * @param expDate    expiration date
     * @param State      state
     * @param street     street
     * @param zipcode    zipcode
     * @param city       city
     */
    public void addExample(int userID, String cardNumber, String expDate, String state,
            String street, String zipcode, String city) {

        String sql = "INSERT INTO user (user_id, card_number, exp_date, zipcode, street, city, state) " +
                "VALUES (?,?,?,?,?,?,?)";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, userID);
            preparedStatement.setString(2, cardNumber);
            preparedStatement.setString(3, expDate);
            preparedStatement.setString(4, zipcode);
            preparedStatement.setString(5, street);
            preparedStatement.setString(6, city);
            preparedStatement.setString(7, state);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

    } // addCard()
}