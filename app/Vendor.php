<?php namespace SupergeeksGadgetProtection;

class Vendor extends BaseModel {

    public function scopeWithData($query)
    {
        return $query->with(['tickets']);
    }

    public function tickets()
    {
        return $this->hasMany('SupergeeksGadgetProtection\Ticket');
    }

}
