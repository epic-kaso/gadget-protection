<?php namespace SupergeeksGadgetProtection\Http\Controllers\Resources;

use SupergeeksGadgetProtection\Http\Controllers\Admin\Response;
use SupergeeksGadgetProtection\Http\Requests;
use SupergeeksGadgetProtection\Http\Controllers\Controller;

use Illuminate\Http\Request;
use SupergeeksGadgetProtection\Http\Requests\AdviserRequest;
use SupergeeksGadgetProtection\User;

class AdvisersController extends Controller
{


    public function __construct()
    {
    }


    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return User::whereRole('adviser')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(AdviserRequest $adviserRequest)
    {
        $data = $adviserRequest->only(['last_name', 'first_name', 'phone_number', 'email', 'password']);

        $user = new User($data);
        $user->setAsAdviser();
        $user->save();
        return $user;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function show($id)
    {
        return User::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return Response
     */
    public function update($id, AdviserRequest $adviserRequest)
    {
        $data = $adviserRequest->only(['last_name', 'first_name', 'phone_number', 'password']);

        $user = User::find($id);
        foreach ($data as $key => $value) {
            $user->{$key} = $value;
        }
        $user->save();
        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }

}
