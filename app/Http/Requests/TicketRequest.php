<?php namespace SupergeeksGadgetProtection\Http\Requests;


use SupergeeksGadgetProtection\Ticket;

class TicketRequest extends Request
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if ($this->is('PUT') || $this->is('PATCH')) {
            if (\Auth::check() && \Auth::user()->isAdmin()) {
                return true;
            } else {
                return Ticket::find($this->get('id'))->user_id == \Auth::user()->id;
            }
        } else {
            return \Auth::check();
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        if ($this->is('post')) {
            return [
                'device_make' => 'required',
                'device_model' => 'required',
                'gadget_category_id' => 'required',
                'vendor_id' => 'required',
                'device_receipt_id' => 'required',
                'device_price' => 'required',
                'device_premium' => 'required',
                'gpp_policy_number' => 'required|unique:tickets',
                'last_name' => 'alpha_dash',
                'first_name' => 'alpha_dash',
                'email' => 'email',
                'phone_number' => 'required',
                'address' => '',
            ];
        }

        if ($this->is('PUT') || $this->is('PATCH')) {
            return [
                'id' => 'required|exists:tickets',
                'gpp_policy_number' => '',
                'last_name' => '',
                'first_name' => '',
                'email' => 'email',
                'phone_number' => '',
                'address' => '',
            ];
        }

        return [];
    }

}
