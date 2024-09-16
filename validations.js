const z = require('zod');

const validateInput = (obj) => {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });
    const response = schema.safeParse(obj);
    console.log(response);
}

module.exports = validateInput;