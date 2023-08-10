<?php

use App\Http\Controllers\BabyController;

/** @var \Laravel\Lumen\Routing\Router $router */
$router->group(['prefix' => 'api'], function () use ($router) {
    $router->get('/babies', 'BabyController@index');
    $router->post('/babies', 'BabyController@store');
    $router->get('/babies/{id}', 'BabyController@show');
    $router->put('/babies/{id}', 'BabyController@update');
    $router->delete('/babies/{id}', 'BabyController@destroy');
});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});
