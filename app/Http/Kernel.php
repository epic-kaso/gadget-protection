<?php namespace SupergeeksGadgetProtection\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{

    /**
     * The application's global HTTP middleware stack.
     *
     * @var array
     */
    protected $middleware = [
        'Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode',
        'Illuminate\Cookie\Middleware\EncryptCookies',
        'Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse',
        'Illuminate\Session\Middleware\StartSession',
        'Illuminate\View\Middleware\ShareErrorsFromSession',
        //'SupergeeksGadgetProtection\Http\Middleware\VerifyCsrfToken',
    ];

    /**
     * The application's route middleware.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'auth' => 'SupergeeksGadgetProtection\Http\Middleware\Authenticate',
        'auth.basic' => 'Illuminate\Auth\Middleware\AuthenticateWithBasicAuth',
        'guest' => 'SupergeeksGadgetProtection\Http\Middleware\RedirectIfAuthenticated',
        'auth-admin' => 'SupergeeksGadgetProtection\Http\Middleware\AdminAuthenticate',
        'auth-adviser' => 'SupergeeksGadgetProtection\Http\Middleware\AdviserAuthenticate',
    ];

}
