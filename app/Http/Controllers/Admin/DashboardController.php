<?php namespace SupergeeksGadgetProtection\Http\Controllers\Admin;

use SupergeeksGadgetProtection\Http\Requests;
use SupergeeksGadgetProtection\Http\Controllers\Controller;
use Input;
use Redirect;
use Request;
use Response;
use SupergeeksGadgetProtection\BaseLinePrice;
use SupergeeksGadgetProtection\Gadget;
use SupergeeksGadgetProtection\GadgetMaker;
use SupergeeksGadgetProtection\Network;
use SupergeeksGadgetProtection\Repositories\DevicesRepository;
use SupergeeksGadgetProtection\Size;


class DashboardController extends Controller
{

    public function getIndex()
    {
        return view('admin.dashboard');
    }

}
