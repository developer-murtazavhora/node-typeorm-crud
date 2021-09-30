import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {User} from "../entity/User";

export class CreateAdminUser1614247656391 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new User();
        user.name = 'Murtaza Vohra';
        user.phone = '1234567890';
        user.email = 'developer.murtazavhora@gmail.com';
        user.password = '123456';
        user.hashPassword();
        user.role = 'ADMIN';
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        //
    }
}
