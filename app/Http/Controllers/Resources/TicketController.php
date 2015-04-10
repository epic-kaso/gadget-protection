<?php namespace SupergeeksGadgetProtection\Http\Controllers\Resources;

use SupergeeksGadgetProtection\Http\Requests;
use SupergeeksGadgetProtection\Http\Controllers\Controller;

use Illuminate\Http\Request;
use SupergeeksGadgetProtection\Http\Requests\TicketRequest;
use SupergeeksGadgetProtection\Ticket;
use SupergeeksGadgetProtection\User;

class TicketController extends Controller
{

    /**
     * @var User
     */
    protected $user;

    function __construct()
    {
        $this->user = \Auth::user();
    }


    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $limit = \Input::get('limit', 2000);
        if ($this->user->isAdmin()) {
            return Ticket::withData()->simplePaginate($limit);
        } else {
            return Ticket::whereUserId($this->user->id)->withData()->simplePaginate($limit);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param TicketRequest $request
     * @return Response
     */
    public function store(TicketRequest $request)
    {
        $data = $request->only(['device_make',
            'device_model',
            'serial_number',
            'gadget_category_id',
            'vendor_id',
            'device_receipt_id',
            'device_price',
            'device_premium',
            'gpp_policy_number',
            'last_name',
            'first_name',
            'email',
            'phone_number',
            'address']);

        $data['user_id'] = $this->user->id;

        $ticket = Ticket::create($data);
        return $ticket;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function show($id)
    {
        if ($this->user->isAdmin()) {
            return Ticket::withData()->whereId($id)->first();
        } else {
            return Ticket::whereUserId($this->user->id)
                ->whereId($id)
                ->withData()
                ->first();
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @param TicketRequest $request
     * @return Response
     */
    public function update($id, TicketRequest $request)
    {
        $ticket = Ticket::find($id);
        if (empty($ticket))
            abort(404);

        $data = $request->only([
            'device_make',
            'device_model',
            'serial_number',
            'gadget_category_id',
            'vendor_id',
            'device_receipt_id',
            'device_price',
            'device_premium',
            'gpp_policy_number',
            'last_name',
            'first_name',
            'email',
            'phone_number',
            'address'
        ]);

        if (!empty($data)) {
            foreach ($data as $key => $value) {
                if (!empty($value)) {
                    $ticket->{$key} = $value;
                }
            }

            $ticket->save();
        }
        $ticket->load(['vendor', 'gadget_category']);
        return $ticket;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        if ($this->user->isAdmin()) {
            return Ticket::destroy($id);
        } else {
            return $this->user->tickets->find($id)->delete();
        }
    }

}
