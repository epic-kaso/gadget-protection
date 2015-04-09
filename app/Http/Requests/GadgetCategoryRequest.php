<?php namespace SupergeeksGadgetProtection\Http\Requests;

class GadgetCategoryRequest extends Request {

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return \Auth::check() && \Auth::user()->isAdmin();
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
        return [
            'name' => 'required|unique:gadget_categories',
            'percentage' => 'required|numeric',
            'fixed' => 'required|integer',
        ];
	}

}
