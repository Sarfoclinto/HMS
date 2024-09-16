import { Form, Input, Flex, DatePicker, Button } from "antd";
type Props = {
  name: string | undefined;
  referralHospital: string;
  transferDate: string;
  onChange: any;
};

const TransferDetailForm = ({
  name,
  referralHospital,
  transferDate,
  onChange,
}: Props) => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form className="mt-3" layout="vertical" onFinish={onFinish}>
      <Flex vertical className="mb-3" gap={5}>
        <label htmlFor="name">Patient name</label>
        <input
          className="h-8 w-4/5 border text-base bg-gray-100 rounded text-stone-400 pl-3 focus:outline-none"
          placeholder="Patient name"
          id="name"
          name="name"
          value={name}
          required
        />
      </Flex>

      <Flex align="center" gap={15}>
        <Form.Item
          className="w-1/2"
          label="Referral Hospital"
          name="referralHospital"
          hasFeedback
          rules={[{ required: true, message: "Field is required" }]}
        >
          <Input
            placeholder="Referral/Transfer Hospital"
            value={referralHospital}
            onChange={onChange}
            name="referralHospital"
          ></Input>
        </Form.Item>
        <Form.Item
          className="w-1/2"
          label="Transfer Date"
          name="transferDate"
          hasFeedback
          rules={[{ required: true, message: "Field is required" }]}
        >
          <DatePicker
            className="w-full"
            value={transferDate}
            onChange={onChange}
            name="transferDate"
          />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Transfer
        </Button>
      </Flex>
    </Form>
  );
};

export default TransferDetailForm;
