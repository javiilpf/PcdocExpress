<?php

namespace App\Enum;

enum ApplicationType: string
{
    case REPARACION = 'reparacion';
    case INSTALACION = 'instalacion';
    case MANTENIMIENTO = 'mantenimiento';
}
?>