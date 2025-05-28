<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250326110916 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE installation (id INT AUTO_INCREMENT NOT NULL, model VARCHAR(255) NOT NULL, processor VARCHAR(255) NOT NULL, ram VARCHAR(255) NOT NULL, storage VARCHAR(255) NOT NULL, installation_date DATETIME NOT NULL, state VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE installation_product (installation_id INT NOT NULL, product_id INT NOT NULL, INDEX IDX_8CD96AD2167B88B4 (installation_id), INDEX IDX_8CD96AD24584665A (product_id), PRIMARY KEY(installation_id, product_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE installation_product ADD CONSTRAINT FK_8CD96AD2167B88B4 FOREIGN KEY (installation_id) REFERENCES installation (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE installation_product ADD CONSTRAINT FK_8CD96AD24584665A FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE installation_product DROP FOREIGN KEY FK_8CD96AD2167B88B4');
        $this->addSql('ALTER TABLE installation_product DROP FOREIGN KEY FK_8CD96AD24584665A');
        $this->addSql('DROP TABLE installation');
        $this->addSql('DROP TABLE installation_product');
    }
}
