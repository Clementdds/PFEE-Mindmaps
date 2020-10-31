package utils;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class Treatment {
    public static String GenerateUniqueUrl(List<String>allCurrentUrls)
    {
        String uniqueID = UUID.randomUUID().toString();
        while (allCurrentUrls.contains(uniqueID))
            uniqueID = UUID.randomUUID().toString();

        return uniqueID;
    }
}
