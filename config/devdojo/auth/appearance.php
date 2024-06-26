<?php

/*
 * Branding configs for your application
 */

return [
    'logo' => [
        'type' => 'svg',
        'image_src' => '',
        'svg_string' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>
',
        'height' => '32',
    ],
    'background' => [
        'color' => '#f5f5f5',
        'image' => '',
        'image_overlay_color' => '#000000',
        'image_overlay_opacity' => '0.5',
    ],
    'color' => [
        'text' => '#212936',
        'button' => '#09090b',
        'button_text' => '#ffffff',
        'input_text' => '',
        'input_border' => '#212936',
    ],
    'alignment' => [
        'heading' => 'center',
        'container' => 'center',
    ],
    'favicon' => [
        'light' => '/auth/img/favicon.png',
        'dark' => '/auth/img/favicon-dark.png',
    ],
];
