<?php namespace SupergeeksGadgetProtection\Http\Controllers\Resources;

use SupergeeksGadgetProtection\Http\Requests;
use SupergeeksGadgetProtection\Http\Controllers\Controller;

use Illuminate\Http\Request;
use SupergeeksGadgetProtection\Http\Requests\VendorRequest;
use SupergeeksGadgetProtection\Vendor;

class VendorController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth-admin', ['except' => ['index', 'show']]);
    }


    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return Vendor::withData()->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param VendorRequest $request
     * @return Response
     */
    public function store(VendorRequest $request)
    {
        $vendor = Vendor::firstOrCreate(['name' => $request->get('name')]);
        return $vendor;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function show($id)
    {
        return Vendor::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @param VendorRequest $request
     * @return Response
     */
    public function update($id, VendorRequest $request)
    {
        $vendor = Vendor::find($id);
        if (empty($vendor))
            abort(404);
        $vendor->name = $request->get('name');
        $vendor->save();
        return $vendor;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        return Vendor::destroy($id);
    }

}
