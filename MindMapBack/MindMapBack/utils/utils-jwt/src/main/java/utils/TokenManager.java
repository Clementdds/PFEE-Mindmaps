package utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.pfee.mindmap.exceptions.InvalidTokenException;

public class TokenManager {
    private static String Issuer = "PFEE-Mindmaps";
    private static String Secret = "GEyZc9SszO";

    public static String ProduceToken(Integer userId, String email)
    {
        String token = null;
        try {
            Algorithm algorithm = Algorithm.HMAC256(Secret);
            token = JWT.create()
                    .withClaim("userId", userId)
                    .withClaim("email", email)
                    .withIssuer(Issuer)
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            //Invalid Signing configuration / Couldn't convert Claims.
        }
        return token;
    }

    private static Integer GetIdFromToken(String token)
    {
        DecodedJWT jwt = null;
        try {
            Algorithm algorithm = Algorithm.HMAC256(Secret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(Issuer)
                    .build(); //Reusable verifier instance
            jwt = verifier.verify(token);
        } catch (Exception exception){
            throw new InvalidTokenException();
        }
        return jwt.getClaim("userId").asInt();
    }

    public static Integer GetIdFromAuthorizationHeader(String header)
    {
        String[] tokenArray = header.split(" ");
        String token = tokenArray[1];
        return TokenManager.GetIdFromToken(token);
    }
}
