<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250326104847 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE opinion (id INT AUTO_INCREMENT NOT NULL, id_user_id INT NOT NULL, id_product_id INT DEFAULT NULL, reparation_id_id INT DEFAULT NULL, maintenance_id_id INT DEFAULT NULL, opinion VARCHAR(255) NOT NULL, likes INT DEFAULT NULL, INDEX IDX_AB02B02779F37AE5 (id_user_id), INDEX IDX_AB02B027E00EE68D (id_product_id), INDEX IDX_AB02B0273C7B8490 (reparation_id_id), INDEX IDX_AB02B027ED5903AC (maintenance_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE opinion ADD CONSTRAINT FK_AB02B02779F37AE5 FOREIGN KEY (id_user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE opinion ADD CONSTRAINT FK_AB02B027E00EE68D FOREIGN KEY (id_product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE opinion ADD CONSTRAINT FK_AB02B0273C7B8490 FOREIGN KEY (reparation_id_id) REFERENCES reparation (id)');
        $this->addSql('ALTER TABLE opinion ADD CONSTRAINT FK_AB02B027ED5903AC FOREIGN KEY (maintenance_id_id) REFERENCES maintenance (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE opinion DROP FOREIGN KEY FK_AB02B02779F37AE5');
        $this->addSql('ALTER TABLE opinion DROP FOREIGN KEY FK_AB02B027E00EE68D');
        $this->addSql('ALTER TABLE opinion DROP FOREIGN KEY FK_AB02B0273C7B8490');
        $this->addSql('ALTER TABLE opinion DROP FOREIGN KEY FK_AB02B027ED5903AC');
        $this->addSql('DROP TABLE opinion');
    }
}
