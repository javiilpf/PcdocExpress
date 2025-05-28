<?php

namespace App\Enum;

enum ProductType: string
{
    case MOBILE = 'mobile';
    case TABLET = 'tablet';
    case COMPUTER = 'computer';
    case RAM= 'ram';
    case SSD= 'ssd';
    case SSD_M2 = 'ssd_m2';
    case HDD= 'hdd';
    case GPU= 'gpu';
    case CPU= 'cpu';
    case MONITOR= 'monitor';
    case COOLER= 'cooler';
    case MOTHERBOARD= 'motherboard';
}
?>