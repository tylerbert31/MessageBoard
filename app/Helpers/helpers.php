<?php

use Illuminate\Support\Facades\Log;

if (!function_exists('log_info')) {
    function log_info($text, $method = null, $line = null) {
        $methodName = $method ?? '';
        $lineNumber = $line ?? '';
        Log::info("$methodName ({$lineNumber}) ==> " . json_encode($text));
    }
}

if(!function_exists('axios')){
    function axios($method, $url, $data = [], $callback = null)
        {
            $allowedMethods = ['get', 'post', 'put', 'patch', 'delete'];

            if (!in_array(strtolower($method), $allowedMethods)) {
                throw new \InvalidArgumentException('Unsupported HTTP method');
            }

            try {
                $client = new \GuzzleHttp\Client();
                $response = $client->{$method}($url, [
                    'form_params' => $data
                ]);

                $body = json_decode((string) $response->getBody(), true);

                if ($callback && is_callable($callback)) {
                    return call_user_func($callback, $body);
                }

                return $body;
            } catch (\Exception $e) {
                return ['error' => $e->getMessage()];
            }
        }
}

