export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
    // Mínimo 6 chars, 1 Maiuscula, 1 Numero
    const hasMinLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    return {
        isValid: hasMinLength && hasUpperCase && hasNumber,
        message: !hasMinLength ? "Mínimo de 6 caracteres." 
            : !hasUpperCase ? "Precisa de uma letra maiúscula." 
            : !hasNumber ? "Precisa de pelo menos um número." 
            : ""
    };
};

export const validatePhone = (phone) => {
    // Aceita (11) 99999-9999 ou 11999999999
    const re = /^(\(?\d{2}\)?\s?)?(\d{4,5}[-\s]?\d{4})$/;
    return re.test(phone);
};

export const validateCNPJ = (cnpj) => {
    const re = /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/;
    
    if (!re.test(cnpj)) return false;

    const numbers = cnpj.replace(/[^\d]/g, '');
    return numbers.length === 14;
};