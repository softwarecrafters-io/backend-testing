import {Password} from "../../../../core/valueObjects/password";

describe('The Password', () => {

    it('can be created from a strong password', () => {
        expect(Password.createFromPlainText('1234abcdABCD_')).toBeInstanceOf(Password);
    });

    it('rejects a password that is too short', () => {
        expect(() => {
            Password.createFromPlainText('1aA_');
        }).toThrow('Password is too short');
    });

    it('rejects a password missing a number', () => {
        expect(() => {
            Password.createFromPlainText('abcdABCD_');
        }).toThrow('Password must contain a number');
    });

    it('rejects a password missing a lowercase', () => {
        expect(() => {
            Password.createFromPlainText('1234ABCD_');
        }).toThrow('Password must contain a lowercase letter');
    });

    it('rejects a password missing an uppercase', () => {
        expect(() => {
            Password.createFromPlainText('1234abcd_');
        }).toThrow('Password must contain an uppercase letter');
    });

    it('rejects a password missing an underscore', () => {
        expect(() => {
            Password.createFromPlainText('1234abcdABCD');
        }).toThrow('Password must contain an underscore');
    });

    it('rejects a password with multiple missing requirements', () => {
        expect(() => {
            Password.createFromPlainText('abcd');
        }).toThrow('Password is too short, Password must contain a number, Password must contain an uppercase letter, Password must contain an underscore');
    });

    it('can be created from plain text and matches the original text', () => {
        const originalPassword = '1234abcdABCD_';
        const password = Password.createFromPlainText(originalPassword);
        const samePassword = Password.createFromPlainText(originalPassword);
        expect(password.isEquals(samePassword)).toBe(true);
    });

    it('does not match a different password', () => {
        const password = Password.createFromPlainText('SecurePass123_');
        const otherPassword = Password.createFromPlainText('DifferentPass456_');
        expect(password.isEquals(otherPassword)).toBe(false);
    });

    it('ensures password is hashed', () => {
        const originalPassword = '1234abcdABCD_';
        const password = Password.createFromPlainText(originalPassword);
        const hashedValue = password.toString();

        expect(hashedValue).not.toBe(originalPassword);
        expect(hashedValue.length).toBe(64);
        expect(/^[a-fA-F0-9]{64}$/.test(hashedValue)).toBe(true);
    });
});
