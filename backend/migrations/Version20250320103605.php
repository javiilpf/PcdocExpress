<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250320103605 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE maintenance (id INT AUTO_INCREMENT NOT NULL, id_client_id INT NOT NULL, id_administrator_id INT DEFAULT NULL, device_type VARCHAR(255) NOT NULL, model VARCHAR(255) NOT NULL, processor VARCHAR(255) NOT NULL, ram VARCHAR(255) NOT NULL, storage VARCHAR(255) NOT NULL, specifications LONGTEXT NOT NULL, maintenance_date DATETIME NOT NULL, state INT NOT NULL, valoration INT DEFAULT NULL, INDEX IDX_2F84F8E999DED506 (id_client_id), INDEX IDX_2F84F8E9A883BCFD (id_administrator_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reparation (id INT AUTO_INCREMENT NOT NULL, id_client_id INT NOT NULL, id_administrator_id INT DEFAULT NULL, device_type VARCHAR(255) NOT NULL, model VARCHAR(255) NOT NULL, processor VARCHAR(255) NOT NULL, ram VARCHAR(255) NOT NULL, storage VARCHAR(255) NOT NULL, issue_description LONGTEXT NOT NULL, observations LONGTEXT DEFAULT NULL, order_date DATETIME NOT NULL, state INT NOT NULL, valoration INT DEFAULT NULL, INDEX IDX_8FDF219D99DED506 (id_client_id), INDEX IDX_8FDF219DA883BCFD (id_administrator_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, is_verified TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE maintenance ADD CONSTRAINT FK_2F84F8E999DED506 FOREIGN KEY (id_client_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE maintenance ADD CONSTRAINT FK_2F84F8E9A883BCFD FOREIGN KEY (id_administrator_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE reparation ADD CONSTRAINT FK_8FDF219D99DED506 FOREIGN KEY (id_client_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE reparation ADD CONSTRAINT FK_8FDF219DA883BCFD FOREIGN KEY (id_administrator_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE maintenance DROP FOREIGN KEY FK_2F84F8E999DED506');
        $this->addSql('ALTER TABLE maintenance DROP FOREIGN KEY FK_2F84F8E9A883BCFD');
        $this->addSql('ALTER TABLE reparation DROP FOREIGN KEY FK_8FDF219D99DED506');
        $this->addSql('ALTER TABLE reparation DROP FOREIGN KEY FK_8FDF219DA883BCFD');
        $this->addSql('DROP TABLE maintenance');
        $this->addSql('DROP TABLE reparation');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
