package utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

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

    public static Integer GetIdFromToken(String token)
    {
        DecodedJWT jwt = null;
        try {
            Algorithm algorithm = Algorithm.HMAC256(Secret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(Issuer)
                    .build(); //Reusable verifier instance
            jwt = verifier.verify(token);
        } catch (JWTVerificationException exception){
            return -1;
        }
        return jwt.getClaim("userId").asInt();
    }
}
