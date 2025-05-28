<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250527115556 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE installation ADD id_administrator_id INT DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE installation ADD CONSTRAINT FK_1CBA6AB1A883BCFD FOREIGN KEY (id_administrator_id) REFERENCES user (id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_1CBA6AB1A883BCFD ON installation (id_administrator_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE installation DROP FOREIGN KEY FK_1CBA6AB1A883BCFD
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_1CBA6AB1A883BCFD ON installation
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE installation DROP id_administrator_id
        SQL);
    }
}
