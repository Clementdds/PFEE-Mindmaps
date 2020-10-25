package utils;

public enum UserRole {

    Owner(0),
    Shared(1);


    public final int value;
    private UserRole(final int value)
    {
        this.value = value;
    }
}
