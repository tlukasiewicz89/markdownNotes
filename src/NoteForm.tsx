import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { useRef, FormEvent, useState } from "react";
import { NoteData, Tag } from "./App";


type NoteFromProps = {
	onSubmit: (data: NoteData) => void
}

export function NoteForm ({ onSubmit }: NoteFromProps) {
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

	function handleSubmit (e: FormEvent) {
		e.preventDefault();

		// the ! says the value is never going ot be null
		// without the ! TS yells says the value might be null
		onSubmit({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: []
		})
	}

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Stack gap={4}>
					<Row>
						<Col>
							<Form.Group controlId="title">
								<Form.Label>Title</Form.Label>
								<Form.Control ref={titleRef} required />
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="tags">
								<Form.Label>Tags</Form.Label>
								<CreatableReactSelect 
									value={selectedTags.map(tag=>{
										return {label: tag.label, value: tag.id}
									})} 
									isMulti 
								/>
							</Form.Group>
						</Col>
					</Row>
					<Form.Group controlId="markdown">
						<Form.Label>Body</Form.Label>
						<Form.Control ref={markdownRef} required as="textarea" rows={15}/>
					</Form.Group>
						<Stack direction="horizontal" gap={2} className="justify-content-end">
							<Button 
								type="submit"
								variant="primary">
								Save
							</Button>
							<Link to=".." >
								<Button 
									type="button"
									variant="outline-secondary">
									Cancel
								</Button>
							</Link>
						</Stack>
				</Stack>
			</Form>
		</>
  )
}