import EmailValidator from "./EmailValidator";

const ListEmailValidator = (listEmails) => {
    let pass = true;
    const emails = listEmails.trim().split(';');
    emails.forEach(email => {
        if (!EmailValidator(email)) {
            pass = false;
        }
    });
    return pass;
};

export default ListEmailValidator;