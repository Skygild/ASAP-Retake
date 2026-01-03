"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import type { Attachment } from "@/types/booking"
import { FileText, Image, File, Download } from "lucide-react"

interface AttachmentsListProps {
	attachments: Attachment[]
}

function getFileIcon(fileType: string) {
	const type = fileType.toLowerCase()
	if (type.includes("image") || type.includes("jpg") || type.includes("png")) {
		return Image
	}
	if (type.includes("pdf") || type.includes("doc")) {
		return FileText
	}
	return File
}

export function AttachmentsList({ attachments }: AttachmentsListProps) {
	if (attachments.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Attachments</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">No attachments available</p>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Attachments ({attachments.length})</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-3 md:grid-cols-2">
					{attachments.map((attachment) => {
						const Icon = getFileIcon(attachment.fileType)
						return (
							<div
								key={attachment.uuid}
								className="flex items-center justify-between rounded-lg border p-3"
							>
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
										<Icon className="h-5 w-5 text-muted-foreground" />
									</div>
									<div>
										<p className="font-medium">{attachment.name}</p>
										<p className="text-xs text-muted-foreground">
											{formatDate(attachment.createdDate)}
										</p>
									</div>
								</div>
								<Button variant="outline" size="sm">
									<Download className="h-4 w-4" />
								</Button>
							</div>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}
