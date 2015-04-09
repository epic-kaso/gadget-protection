<?php namespace SupergeeksGadgetProtection;

class Ticket extends BaseModel
{

    public function scopeWithData($query)
    {
        return $query->with(['vendor', 'gadget_category']);
    }

    public function vendor()
    {
        return $this->belongsTo('SupergeeksGadgetProtection\Vendor');
    }

    public function gadget_category()
    {
        return $this->belongsTo('SupergeeksGadgetProtection\GadgetCategory');
    }

}
