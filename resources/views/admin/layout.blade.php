<!DOCTYPE html>
<html lang="en" ng-app="AdminApp">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Gadget Protection Plan</title>

    <link href="{{ asset('admin/css/admin.css')."?".time() }}" rel="stylesheet">

    <!-- Fonts -->
    <link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
</head>
<body>
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/"><span style="
                            font-size: 25px;
                            font-weight: 600;
                            color: #14abec;
                            /* text-shadow: 0px 1px 0px rgba(255,255,255,1); */
                            ">Super</span>
                <span style="
                            font-size: 25px;
                            font-weight: 600;
                            color: #fca42f;
                            /* text-shadow: 0px 1px 0px rgba(255,255,255,1); */
                            margin-left: -5px;
">Geeks</span>
                <span style="
                            font-size: 25px;
                            font-weight: 600;
                            margin-left: 10px;">GPP</span></a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li><a href="/">Home</a></li>
            </ul>

            <ul class="nav navbar-nav navbar-right">
                @if (Auth::guest())
                    <li><a href="/auth/login">Login</a></li>
                @else
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                           aria-expanded="false">{{ explode('@',Auth::user()->email)[0] }} <span
                                    class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="/auth/logout">Logout</a></li>
                        </ul>
                    </li>
                @endif
            </ul>
        </div>
    </div>
</nav>
<div class="container start">
    <div class="row">
        @yield('content')
    </div>
</div>

<toast type="toast.type" show="toast.show" messages="toast.messages"></toast>

<!-- Scripts -->
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>
<script src="/admin/webcam/scriptcam.min.js"></script>
<script src="{{ asset('app/libs/angular.min.js')}}"></script>
<script src="{{ asset('app/libs/core_main.js')."?".time() }}"></script>
<script src="{{ asset('app/libs/others_main.js')."?".time() }}"></script>
<script src="{{ asset('admin/js/admin_main.js')."?".time() }}"></script>
<script>
    var app = angular.module("AdminApp");
    app.constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');
    app.factory("CurrentUser", function () {
        return {
            get: function () {
                return JSON.parse('<?php echo Auth::user()->toJson(); ?>');
            }
        }
    });

    app.factory("ScriptCam", function () {
        return {
            path: "/admin/webcam/"
        }
    });
</script>
</body>
</html>
