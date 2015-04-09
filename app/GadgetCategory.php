<?php namespace SupergeeksGadgetProtection;

class GadgetCategory extends BaseModel
{

    public function scopeWithData($query)
    {
        return $query->with(['tickets']);
    }

    public function tickets()
    {
        return $this->hasMany('SupergeeksGadgetProtection\Ticket');
    }
}
