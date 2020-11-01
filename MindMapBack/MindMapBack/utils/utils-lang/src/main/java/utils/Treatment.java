package utils;

import java.util.List;
import java.util.UUID;

public class Treatment {
    public static String GenerateUniqueUrl(List<String>allCurrentUrls)
    {
        String uniqueID = UUID.randomUUID().toString();
        while (allCurrentUrls.contains(uniqueID))
            uniqueID = UUID.randomUUID().toString();

        return uniqueID;
    }
}
