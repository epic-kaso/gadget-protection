<?php namespace SupergeeksGadgetProtection\Http\Controllers\Resources;

use SupergeeksGadgetProtection\GadgetCategory;
use SupergeeksGadgetProtection\Http\Requests;
use SupergeeksGadgetProtection\Http\Controllers\Controller;

use Illuminate\Http\Request;
use SupergeeksGadgetProtection\Http\Requests\GadgetCategoryRequest;

class GadgetCategoryController extends Controller
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
        return GadgetCategory::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param GadgetCategoryRequest $request
     * @return Response
     */
    public function store(GadgetCategoryRequest $request)
    {
        $gadget_category = GadgetCategory::firstOrNew(
            [
                'name' => $request->get('name')
            ]);

        $gadget_category->percentage = $request->get('percentage');
        $gadget_category->fixed = $request->get('fixed');
        $gadget_category->save();

        return $gadget_category;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function show($id)
    {
        return GadgetCategory::find($id);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @param GadgetCategoryRequest $request
     * @return Response
     */
    public function update($id, GadgetCategoryRequest $request)
    {
        $gadget_category = GadgetCategory::find($id);
        if (empty($gadget_category))
            abort(404);

        $gadget_category->name = $request->get('name', $gadget_category->name);
        $gadget_category->percentage = $request->get('percentage', $gadget_category->percentage);
        $gadget_category->fixed = $request->get('fixed', $gadget_category->fixed);

        $gadget_category->save();
        return $gadget_category;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        return GadgetCategory::destroy($id);
    }

}
