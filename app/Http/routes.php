<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::controllers(
    [
        'auth' => 'Auth\AuthController',
        'password' => 'Auth\PasswordController',
    ]
);

Route::group(
    [
        'namespace' => 'Admin',
        'middleware' => 'auth-adviser'
    ],
    function () {
        Route::get(
            '/',
            [
                'as' => 'devices',
                'uses' => 'DashboardController@getIndex'
            ]
        );
    });


Route::group(
    [
        'prefix' => 'resources',
        'namespace' => 'Resources'
    ],
    function () {
        Route::resource('mail', 'MailerController');
        Route::resource('advisers', 'AdvisersController');
        Route::resource('ticket-import', 'ImportExcelToTicketController');
        Route::resource('vendor', 'VendorController');
        Route::resource('ticket', 'TicketController');
        Route::resource('gadget-category', 'GadgetCategoryController');
    });
