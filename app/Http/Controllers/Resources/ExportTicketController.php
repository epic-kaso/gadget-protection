<?php namespace SupergeeksGadgetProtection\Http\Controllers\Resources;

use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use SupergeeksGadgetProtection\Http\Requests;
use SupergeeksGadgetProtection\Http\Controllers\Controller;

use Illuminate\Http\Request;
use SupergeeksGadgetProtection\Http\Requests\ExportTicketRequest;
use SupergeeksGadgetProtection\Ticket;

class ExportTicketController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ExportTicketRequest $request
     * @return Response
     */
    public function store(ExportTicketRequest $request)
    {
        $gadget_category_id = $request->get('gadget_category_id', 'all');
        $vendor_id = $request->get('vendor_id', 'all');
        $columns = $request->get('columns', null);

        $selectCols = [];

        if (is_null($columns)) {
            $selectCols = ['*'];
        } else {
            foreach ($columns as $key => $value) {
                if ($value) {
                    $selectCols[] = $key;
                }
            }
        }

        $builder = Ticket::with(['gadget_category', 'vendor']);

        if (is_numeric($gadget_category_id)) {
            $builder->where('gadget_category_id', $gadget_category_id);
        }

        if (is_numeric($vendor_id)) {
            $builder->where('vendor_id', $vendor_id);
        }

        $data = $builder->get($selectCols);

        foreach ($data as $d) {
            $d->vendor_name = $d->vendor->name;
            $d->gadget_category_name = $d->gadget_category->name;
        }

        $response = \Excel::create('Export-' . Str::slug(Carbon::now()->toDateTimeString()),
            function ($excel) use ($data) {
                $excel->setTitle('Tickets Export');
                $excel->setCreator(\Auth::user()->email)
                    ->setCompany('Supergeeks.com.ng');

                $excel->sheet('Tickets', function ($sheet) use ($data) {
                    $sheet->fromArray($data->toArray(), null, 'A1', false, true);
                });

            })->store('xls', false, true);

        return \Response::json(['download_link' => route('download-export', $response['file'])]);
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
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function edit($id)
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
