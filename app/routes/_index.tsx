import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { authenticator } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
	return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export const action = ({ request }: ActionFunctionArgs) => {
	console.log("request", request);
	return authenticator.authenticate("auth0", request);
};

export default function Index() {
	const [searchParams] = useSearchParams();
	const [showLoginFailedDialog, setShowLoginFailedDialog] = useState(false);
  
	useEffect(() => {
	  if (searchParams.get("loginFailed") === "true") {
		setShowLoginFailedDialog(true);
	  }
	}, [searchParams]);
  
	const closeDialog = () => {
	  setShowLoginFailedDialog(false);
	  const newUrl = new URL(window.location.href);
	  newUrl.searchParams.delete("loginFailed");
	  window.history.replaceState({}, "", newUrl.toString());
	};
	return (
		<div>
			<h1>初期ページ</h1>
					{showLoginFailedDialog && (
				<>
					<div 
						className="fixed inset-0 bg-black bg-opacity-50 z-40"
						onClick={closeDialog}
					></div>
					<div className="fixed inset-0 flex items-center justify-center z-50">
						<div className="card w-96 bg-base-100 card-md shadow-xl">
							<div className="card-body">
								<h2 className="card-title justify-center">ログイン失敗</h2>
								<p>ログインに失敗しました。しばらくしてから、もう一度お試しください。</p>
								<div className="justify-end card-actions">
									<button onClick={closeDialog} className="btn btn-primary">閉じる</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
