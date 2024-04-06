'use client';

import React from 'react';

import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';

import SignUp from '@/app/_components/SignUp/SignUp';
import SignIn from '@/app/_components/SignIn/SignIn';

export default function Auth() {
  const [selected, setSelected] = React.useState<string | number>('login');

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="h-[500px] w-[340px]">
        <Card className="h-auto w-full max-w-full">
          <CardBody className="overflow-hidden">
            <Tabs fullWidth size="md" aria-label="Tabs form" selectedKey={selected} onSelectionChange={setSelected}>
              <Tab key="login" title="Login">
                <SignIn setSelected={setSelected} />
              </Tab>

              <Tab key="sign-up" title="Sign up">
                <SignUp setSelected={setSelected} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
