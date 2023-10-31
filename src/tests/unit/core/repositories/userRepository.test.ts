import {User} from "../../../../core/entities/user";
import {Email} from "../../../../core/valueObjects/email";
import {Id} from "../../../../core/valueObjects/id";
import {Password} from "../../../../core/valueObjects/password";
import {InMemoryUserRepository, UserRepository} from "../../../../core/repositories/userRepository";

describe('The In Memory User Repository', () => {
    let repo: UserRepository;

    beforeEach(() => {
        repo = new InMemoryUserRepository();
    });

    it('saves and finds a user by ID', async () => {
        const id = Id.generateUniqueId();
        const user = createUser({id});
        await repo.save(user);

        const retrievedUser = await repo.findById(id);
        expect(retrievedUser).toEqual(user);
    });

    it('does not find a non-existent user by ID', async () => {
        const id = Id.generateUniqueId();

        const retrievedUser = await repo.findById(id);
        expect(retrievedUser).toBeUndefined();
    });

    it('saves and finds a user by email', async () => {
        const email = Email.create('test@example.com')
        const user = createUser({});
        await repo.save(user);

        const foundUser = await repo.findByEmail(email);

        expect(foundUser).toEqual(user);
    });

    it('does not find a user by a non-existent email', async () => {
        const email = Email.create('nonexistent@example.com');

        const foundUser = await repo.findByEmail(email);

        expect(foundUser).toBeUndefined();
    });

    it('finds all users', async () => {
        const user1 = createUser({});
        const user2 = createUser({email:Email.create('test2@example.com')});
        await repo.save(user1);
        await repo.save(user2);

        const users = await repo.findAll();

        expect(users).toHaveLength(2);
    });

    it('finds no users when the repository is empty', async () => {
        const users = await repo.findAll();

        expect(users).toHaveLength(0);
    });

    it('removes an user', async () => {
        const id = Id.generateUniqueId();
        const user = createUser({id});
        await repo.save(user);

        await repo.remove(user);
        const retrievedUser = await repo.findById(id);

        expect(retrievedUser).toBeUndefined();
    });
});

function createUser({id = Id.generateUniqueId(), email = Email.create('test@example.com') }:{id?: Id, email?: Email}) {
    const password = Password.createFromPlainText('TestPass123_');
    return new User(id, email, password);
}
