<?php

class User_model extends CI_Model{

	public function get_user_list()
	{
		$query = $this->db->get("user");

		if($query->num_rows() > 0)
			return $query->result_array();
		else
			return array();
	}

	public function insert_user($data)
	{
		$this->db->insert("user",$data);
		return $this->db->insert_id();
	}

	public function delete_user($whr)
	{
		$this->db->where($whr);
		$this->db->delete("user");
		return 1;
	}

	public function update_user($data,$whr)
	{
		$this->db->where($whr);
		$this->db->update("user",$data);

		return 1;
	}
}