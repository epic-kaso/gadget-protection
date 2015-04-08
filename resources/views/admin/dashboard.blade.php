@extends('admin.layout')
@section('content')


    <div class="col-md-8 col-offset-md-3">
        <div class="container">
            <div class="row">
                <div class="panel panel-default main-panel">
                    <div class="panel-body">
                        @if(Auth::user()->isAdmin())
                            <div class="col-md-3 side-bar">
                                <div class="list-group my-menu-group">
                                    <a class="list-group-item"
                                       ng-class="{'active': active_nav == 'ticket'}"
                                       ui-sref="ticket.menu"><span class="fa fa-ticket"></span> Tickets</a>

                                    <a class="list-group-item"
                                       ng-class="{'active': active_nav == 'gadgets'}"
                                       ui-sref="gadgets"><span class="fa fa-mobile-phone"></span> Supported Gadgets</a>
                                    <a class="list-group-item"
                                       ng-class="{'active': active_nav == 'advisers'}"
                                       ui-sref="advisers.menu"><span class="fa fa-user-secret"></span> Advisers</a>
                                    <a class="list-group-item"
                                       ng-class="{'active': active_nav == 'vendors'}"
                                       ui-sref="vendors"><span class="fa fa-apple"></span> Vendors</a>
                                    <a class="list-group-item" ui-sref="config"
                                       ng-class="{'active': active_nav == 'config'}"><span class="fa fa-cogs"></span>
                                        Settings</a>
                                </div>
                            </div>
                        @endif

                        <div class="col-md-{{ Auth::user()->isAdmin() ? '9' : '12' }} main-content">
                            <div class="main-content-container">
                                <div ui-view class="slide" autoscroll="false"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

@stop