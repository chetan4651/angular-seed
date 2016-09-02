<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller{

	public function __construct(){
		parent::__construct();

		$this->load->model("api/User_model");
	}

	public function get_user_list()
	{
		$data = $this->User_model->get_user_list();

		$d = array(
			'id' => '1',
			'name' => 'chetan',
			'email' => 'chetan.mohol@gmail.com'
		);

		echo json_encode($data);
		//return $d;
	}

	public function add_user()
	{
		$data = array(
			"user_name" => $this->input->post("user_name"),
			"user_email" => $this->input->post("user_email")
		);

		$user_id = $this->User_model->insert_user($data);
		echo $user_id;
	}

	public function delete_user()
	{
		$whr = array(
			"user_id" => $this->input->post("user_id"),
		);

		$this->User_model->delete_user($whr);
		echo "";
	}

	public function update_user_info()
	{
		$whr = array(
			"user_id" => trim($this->input->post("user_id")),
		);
		
		$data = array(
			"user_name" => trim($this->input->post("user_name")),
			"user_email" => trim($this->input->post("user_email"))
		);

		$this->User_model->update_user($data,$whr);
		print_r($_POST);
	}
}