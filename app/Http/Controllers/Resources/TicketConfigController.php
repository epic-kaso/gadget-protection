<?php namespace SupergeeksGadgetProtection\Http\Controllers\Resources;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Schema;
use SupergeeksGadgetProtection\Http\Requests;
use SupergeeksGadgetProtection\Http\Controllers\Controller;

use Illuminate\Http\Request;

class TicketConfigController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $array = Schema::getColumnListing('tickets');
        $collection = Collection::make($array);
        return $collection->map(function ($i) {
            $item = [];
            $item['slug'] = $i;
            $item['title'] = str_replace('_', ' ', Str::title($i));
            return $item;
        })->all();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return Response
     */
    public function update($id)
    {
        //
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
